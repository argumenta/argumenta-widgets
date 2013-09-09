
define(
[
    'chai',
    'sinon',
    'fixtures',
    'argumenta/widgets/User',
    'argumenta/widgets/Base',
    'argumenta/config'
],
function(chai, undefined, fixtures, User, Base, Config) {

    var assert = chai.assert;
    var baseUrl = Config.baseUrl;

    // Helpers

    var withUser = function(user) {
        if (arguments.length == 0) {
            user = new User(fixtures.validPublicUserData());
        }
        user.element.appendTo('body');
        assert.lengthOf(
            $('body').find(user.element), 1,
            'Widget present in DOM.'
        );
        return user;
    };

    // Tests

    describe('User', function() {

        it('should be a function', function() {
            assert.isFunction(User);
        });

        it('should include a moduleID', function() {
            assert.equal(User.prototype.moduleID, 'User');
        });

        describe('new User( options, element )', function() {

            it('should return a new User widget', sinon.test(function() {
                var server = sinon.fakeServer.create();
                var user = new User();
                assert.instanceOf(
                    user, Base,
                    'User widgets inherit from Base.'
                );
                assert.instanceOf(
                    user, User,
                    'User widgets are instances of User.'
                );
            }));

            it('should display the repos count', sinon.test(function() {
                var data = fixtures.validPublicUserData();
                data.metadata.repos_count = 1;
                var user = new User(data);
                withUser(user);
                assert.equal(
                  user.element.find('.repos-count').html(), '1'
                );
            }));
        });
    });
});
