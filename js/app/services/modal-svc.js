Jump.Services.factory('service.modal', 
    [
        '$compile', 
        '$document',
        '$animate',
        function($compile, $document, $animate) {

    var body = $document.find('body'),
        backdrop,
        overlay,
        callback;

    function open (scope, template, closeCallback) {

        var positionWrapper;

        if (!scope || typeof scope !== 'object') {
            throw 'missing scope parameter';
        }

        if (!template || typeof template !== 'object') {
            throw 'missing template parameter';
        }

        callback = closeCallback || undefined;

        //backdrop = $compile(angular.element('<div ng-click="close()" class="modal-backdrop" style="background:rgba(10,10,10, 0.6); position:fixed; top:0px;right:0px;left:0px;bottom:0px;"></div>'))(scope);
        backdrop = $compile(angular.element('<div ng-click="close()" class="modal-backdrop" style="z-index:999; background:rgba(10,10,10, 0.0); position:fixed; top:0px;right:0px;left:0px;bottom:0px;"></div>'))(scope);

        // add the inner modal-position wrapper in order to center
        // dynamically sized modals
        positionWrapper = angular.element('<div class="modal-position"></div>');
        positionWrapper.append(template);

        overlay = angular.element('<div class="modal-overlay"></div>');
        overlay.append(positionWrapper);

        $animate.enter(backdrop, body);
        $animate.enter(overlay, body);

        scope.close = close;
    }

    function close () {
        if (overlay) {
            $animate.leave(overlay, function () {
                backdrop.remove();
            });
    
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    return {
        open: open,
        close: close
    }
}]);
