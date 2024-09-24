/**
 * @generated SignedSource<<2c5f7199360e05abb4af27c36319c3d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ComponentListGetComponentsQuery$variables = Record<PropertyKey, never>;
export type ComponentListGetComponentsQuery$data = {
  readonly getComponents: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }> | null | undefined;
};
export type ComponentListGetComponentsQuery = {
  response: ComponentListGetComponentsQuery$data;
  variables: ComponentListGetComponentsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "getComponents",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ComponentListGetComponentsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ComponentListGetComponentsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "43fccfa0644ef8d4797648d83289dff4",
    "id": null,
    "metadata": {},
    "name": "ComponentListGetComponentsQuery",
    "operationKind": "query",
    "text": "query ComponentListGetComponentsQuery {\n  getComponents {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "95f1e893409e664093f64d9d1530f3c5";

export default node;
