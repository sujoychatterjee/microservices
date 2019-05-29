class GreenComponentController {

}

export const greenComponent = {
    template: '<h2>This is Green content (ID: {{$ctrl.viewId}}) </h2>',
    controller: GreenComponentController,
    bindings: {
        viewId: '=',
    }
}