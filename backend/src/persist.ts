// Read `data.json` and create a live binding to it using a proxied object. Changes to the object will automatically be
// persisted to `data.json`.

import {existsSync} from "node:fs";
import {readFile, writeFile} from "node:fs/promises";

const path = new URL(import.meta.resolve("./data.json")).pathname;
const saveInterval = 500; // in ms; how often to check for changes to the data object

type Data = Record<number | string | symbol, unknown>;
type JsonSerializationField =
	| {
		$$dataType: "map",
		value: Array<[unknown, unknown]>,
	};

// Custom serializer to handle Maps
const customStringify = (obj: Data): string => {
	return JSON.stringify(obj, (key, value: unknown) => {
		if (value instanceof Map) {
			return {
				$$dataType: "map",
				value: Array.from(value.entries()), // Convert Map to array of [key, value]
			} satisfies JsonSerializationField;
		} else {
			return value;
		}
	}, 2);
};

// Custom deserializer to parse Maps
const customParse = (jsonStr: string): Data => {
	return JSON.parse(jsonStr, (key, value: unknown) => {
		const valueIsObject = typeof value === "object" && value !== null;
		const valueIsJsonSerializedField = valueIsObject && "$$dataType" in value && "value" in value;
		if (!valueIsJsonSerializedField) return value;

		const jsonField = value as JsonSerializationField;

		switch (jsonField.$$dataType) {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Leaving the possibility open for more serialized types
			case "map": {
				return new Map(jsonField.value); // Convert array back to Map
			}
		}
	}) as Data;
};

const loadJsonFile = async () => {
	if (!existsSync(path)) throw new Error(`File not found: ${path}`);

	const data = await readFile(path, "utf8");
	return customParse(data);
};

// Variables for locking writes to the file
let isWriting = false;
let pendingWrite = false;

const saveJsonFile = async (data: Data) => {
	if (isWriting) {
		pendingWrite = true;
		return;
	}

	isWriting = true;

	try {
		await writeFile(path, customStringify(data), "utf8");
	} catch (err) {
		console.error("Error writing file:", err);
	} finally {
		isWriting = false;

		if (pendingWrite) {
			pendingWrite = false;
			await saveJsonFile(data);
		}
	}
};

const data = await loadJsonFile();

// Keep track of the last serialized data. If the data object changes, we'll compare it to this to see if we need to save.
let lastSerializedData = customStringify(data);
const checkForChangesAndSave = async () => {
	const currentSerializedData = customStringify(data);
	if (currentSerializedData !== lastSerializedData) {
		await saveJsonFile(data);
		lastSerializedData = currentSerializedData;
	}
};
setInterval(checkForChangesAndSave, saveInterval);

export {data};
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- Helper function cos I think it makes the type casting look cleaner
export const getDataAsType = <T extends Data>() => data as T;
