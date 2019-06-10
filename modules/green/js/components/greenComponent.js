class GreenComponentController {
    // no op
}

export const greenComponent = {
    template: `<div>
        <h2>[Angular] This is Green content (ID: {{$ctrl.viewId}}) </h2>
        <store-counter experimental-service="$ctrl.services.experimentalService" ></store-counter>
        <blue-operations><blue-operations/>
    </div>`,
    controller: GreenComponentController,
    bindings: {
        viewId: '=',
        services: '=',
    }
}