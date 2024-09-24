/**
 * @generated SignedSource<<d6789d6e4eee61cdd9ac23f5258cb506>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ComponentListRemoveComponentMutation$variables = {
  id: string;
};
export type ComponentListRemoveComponentMutation$data = {
  readonly removeComponent: string | null | undefined;
};
export type ComponentListRemoveComponentMutation = {
  response: ComponentListRemoveComponentMutation$data;
  variables: ComponentListRemoveComponentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "removeComponent",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ComponentListRemoveComponentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ComponentListRemoveComponentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f017ac991ced81f48853bfe7e0b5872b",
    "id": null,
    "metadata": {},
    "name": "ComponentListRemoveComponentMutation",
    "operationKind": "mutation",
    "text": "mutation ComponentListRemoveComponentMutation(\n  $id: ID!\n) {\n  removeComponent(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "9b6a9039f3f6f9ad536f92bcd1df7dec";

export default node;
