class GreenComponentController {

}

export const greenComponent = {
    template: `<h2>This is Green content (ID: {{$ctrl.viewId}}) </h2>
        <store-counter experimental-service="$ctrl.services.experimentalService" />
    `,
    controller: GreenComponentController,
    bindings: {
        viewId: '=',
        services: '=',
    }
}