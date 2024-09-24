/**
 * @generated SignedSource<<0c663826179067e7e9af58461ec26993>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ComponentListCreateComponentMutation$variables = {
  name: string;
};
export type ComponentListCreateComponentMutation$data = {
  readonly createComponent: {
    readonly id: string;
  } | null | undefined;
};
export type ComponentListCreateComponentMutation = {
  response: ComponentListCreateComponentMutation$data;
  variables: ComponentListCreateComponentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "createComponent",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ComponentListCreateComponentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ComponentListCreateComponentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5686812d47057e811c95f561ebc1bd68",
    "id": null,
    "metadata": {},
    "name": "ComponentListCreateComponentMutation",
    "operationKind": "mutation",
    "text": "mutation ComponentListCreateComponentMutation(\n  $name: String!\n) {\n  createComponent(name: $name) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "20299b226a63a276a4f62725bbef3e38";

export default node;
