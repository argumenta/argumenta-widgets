
define( 'argumenta/widgets/User',
[
    "require-jquery",
    "argumenta/widgets/Base",
    "text!./User/template.mustache.html",
    "argumenta/sandbox"
],
function( $, Base, Template, Sandbox ) {

    var User = Base.module( {

        moduleID: 'User',
        template: Template,

        defaults: {
        },

        init: function( options, originalElem ) {
            var self = this;
        },

        prototype: {

            // Binds UI behavior after refresh.
            _bindUI: function() {
                var self = this;
                self.userAvatar = self.element.children('.user-avatar');
                self.userInfo = self.element.children('.user-info');
                self.userUsername = self.userInfo.children('.user-username');
                self.userMetadata = self.userInfo.children('.user-metadata');
                self.userReposCount = self.userMetadata.children('.repos-count');
            }
        },

        "static": {
        }
    } );

    return User;
} );
