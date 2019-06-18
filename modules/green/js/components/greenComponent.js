class GreenComponentController {
    // no op
}

export const greenComponent = {
    template: `<div>
        <h3>[Angular, in iframe, has its own angular bootstrap]<h3> <h2>This is Green content (ID: {{$ctrl.viewId}}) </h2>
        <store-counter experimental-service="$ctrl.services.experimentalService" ></store-counter>
        <blue-operations><blue-operations/>
    </div>`,
    controller: GreenComponentController,
    bindings: {
        viewId: '=',
        services: '=',
    }
}