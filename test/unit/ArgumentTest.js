
define(
[
    'chai',
    'sinon',
    'fixtures',
    'helpers',
    'argumenta/widgets/Argument',
    'argumenta/widgets/Proposition',
    'argumenta/widgets/Base',
    'argumenta/config'
],
function(chai, undefined, fixtures, helpers, Argument, Proposition, Base, Config ) {

    var assert = chai.assert;
    var baseUrl = Config.baseUrl;

    // Assertions

    var assertContainsPropositions = function( argument, data ) {
        var props = argument.element.find('.proposition-widget');
        assert.lengthOf(
            props, data.propositions.length,
            'Shows correct number of proposition elements.'
        );
        for (var i = 0; i < props.length; i++) {
            var $p = $(props[i]);
            var p = $p.data('proposition-widget');
            assert.instanceOf(
                p, Proposition,
                'Each element has a proposition widget.'
            );
        }
    };

    var assertPropositionsVisible = function( argument ) {
        assert.ok( argument.propositionsVisible == true );
    };

    var assertShowsPropositions = function( argument, data ) {
        assertContainsPropositions(argument, data);
        assertPropositionsVisible(argument);
    };

    // Helpers

    var withArgument = function(argument) {
        if (!argument) {
            argument = fixtures.validArgument();
        }
        argument.element.appendTo('body');
        assert.lengthOf(
            $('body').find(argument.element), 1,
            'Widget present in DOM.'
        );
        return argument;
    };

    // Tests

    describe('Argument', function() {

        it('should be a function', function() {
            assert.isFunction(Argument);
        });

        it('should include a moduleID', function() {
            assert.equal(Argument.prototype.moduleID, 'Argument');
        });

        describe('new Argument( options, element )', function() {

            it('should return a new Argument widget', function() {
                var argData = fixtures.validArgumentData();
                var argument = new Argument(argData);
                assert.instanceOf(argument, Argument);
                assert.instanceOf(argument, Base);
            });

            it('should display the argument title', function() {
                var data = fixtures.validArgumentData();
                var argument = new Argument(data);
                var html = argument.element.html();
                assert.include(
                    html, data.title,
                    'Check title.'
                );
            });

            it('should display the name of the committer', function() {
                var data = fixtures.validArgumentData();
                data.commit = fixtures.validCommitData();
                var argument = new Argument(data);
                var link = argument.element.find('.committer a').first();
                var html = link.html();
                assert.include(
                    html, data.commit.committer,
                    'Check committer.'
                );
            });

            it('should display the commit date', function() {
                var data = fixtures.validArgumentData();
                data.commit = fixtures.validCommitData();
                var argument = new Argument(data);
                var span = argument.element.find('.commit-date').first();
                var html = span.html();
                assert.include(
                    html, data.commit.commit_date,
                    'Check commit date.'
                );
            });

            it('should display a link to argument by SHA-1', function() {
                var data = fixtures.validArgumentData();
                var argument = new Argument(data);
                var link = argument.element.find('.argument-sha1 a').first();
                var html = link.html();
                assert.include(
                    link.prop('href'), '/arguments/' + data.sha1,
                    'Check SHA-1 link.'
                );
                assert.include(
                    html, data.sha1.substr(0, 20),
                    'Check SHA-1.'
                );
            });

            it('should show propositions by default', function() {
                var data = fixtures.validArgumentData();
                delete data.show_propositions;
                var argument = new Argument(data);
                assert.equal(
                    argument.options.show_propositions, true,
                    'Inherits the default option.'
                );
            });

            it('should request argument data when only SHA-1 is given',
            sinon.test(function() {
                var data = fixtures.validArgumentData();
                var server = sinon.fakeServer.create();
                var argument = new Argument({sha1: data.sha1});
                server.respondWith(
                    'GET',
                    baseUrl + '/arguments/' + data.sha1 + '.json',
                    [
                        200,
                        fixtures.headers('JSON'),
                        JSON.stringify( { argument: data } )
                    ]
                );
                server.respond();
                helpers.assertSuperset(
                    argument.options, data,
                    "Check data was requested and retrieved."
                );
            }));
        });

        describe('getType()', function() {
            it('should return the object type', function() {
                var argument = fixtures.validArgument();
                assert.equal(argument.getType(), 'argument');
            });
        });

        describe('getSha1()', function() {
            it('should return the object sha1', function() {
                var argument = fixtures.validArgument();
                assert.equal(
                    argument.getSha1(),
                    '7077e1ce31bc8e9d2a88479aa2d159f2f9de4856',
                    'Check SHA1.'
                );
            });
        });

        describe('getCommitter()', function() {
            it('should return the committer', function() {
                var argument = fixtures.validArgument();
                assert.equal(
                    argument.getCommitter(),
                    'tester',
                    'Check committer.'
                );
            });
        });

        describe('getPropositionWidgets()', function() {
            it('should return a widget for each proposition', function() {
                var data = fixtures.validArgumentData();
                var argument = new Argument(data);
                var props = argument.getPropositionWidgets();
                assert.lengthOf(
                    props, data.propositions.length,
                    'Returns correct number of objects.'
                );
                for (var i = 0; i < props.length; i++) {
                    var p = props[i];
                    assert.instanceOf(
                        p, Proposition,
                        'Each object returned is a proposition widget.'
                    );
                }
            });
        });

        describe('setPropositions( props )', function() {
            it('should load the given propositions data', function() {
                var data = fixtures.validArgumentData();
                var argument = new Argument(data);
                argument.setPropositions([]);
                assert.deepEqual(
                    argument.propositions, [],
                    'Clear propositions.'
                );
                argument.setPropositions(data.propositions);
                assert.deepEqual(
                    argument.propositions, data.propositions,
                    'Set propositions.'
                );
            });
        });

        describe('Argument propositions', function() {

            it('should show propositions when option is set', function() {
                var data = fixtures.validArgumentData();
                data.show_propositions = true;
                var argument = new Argument(data);
                assertShowsPropositions(argument, data);
            });

            it('should toggle propositions when main panel clicked', function() {
                var data = fixtures.validArgumentData();
                data.show_propositions = false;
                var argument = new Argument(data);
                var checkPropositions = function() {
                    assertShowsPropositions(argument, data);
                };
                assert.throws(
                    checkPropositions,
                    Error, null,
                    'Propositions initially hidden.'
                );
                argument.main.click();
                assert.doesNotThrow(
                    checkPropositions,
                    Error, null,
                    'Propositions revealed after click.'
                );
                argument.main.click();
                assert.throws(
                    checkPropositions,
                    Error, null,
                    'Propositions hidden after second click.'
                );
            });

            it('should request propositions if not in options',
            sinon.test(function() {
                var data = fixtures.validArgumentData();
                var props = data.propositions;
                delete data.propositions;
                var argument = new Argument(data);
                var spy = sinon.spy(argument, "setPropositions");
                var server = sinon.fakeServer.create();
                server.respondWith(
                    'GET',
                    baseUrl + '/arguments/' + data.sha1 + '/propositions.json',
                    [
                        200,
                        fixtures.headers('JSON'),
                        JSON.stringify({
                            propositions: props
                        })
                    ]
                );
                argument.main.click();
                server.respond();
                assert.equal(
                    spy.calledWith(props), true,
                    'Check propositions request callback.'
                );
            }));
        });

        describe('Argument menu', function() {

            afterEach(function() {
                $('body').empty();
            });

            it('should send request when `Delete Repo` clicked',
            sinon.test(function() {
                var argument = withArgument();
                var spy = sinon.spy(jQuery, "ajax");
                argument.menu.click();
                argument.deleteButton.click();
                assert.ok(
                    spy.calledWith(
                        sinon.match({
                            type: 'DELETE',
                            url: baseUrl + '/tester/the-argument-title.json'
                        })
                    ),
                    'Sends DELETE request for repo.'
                );
            }));

            it('should remove widget on deletion success',
            sinon.test(function() {
                var argument = withArgument();
                var server = sinon.fakeServer.create();
                argument.menu.click();
                argument.deleteButton.click();
                server.respondWith('Deleted argument repo.');
                server.respond();
                assert.lengthOf(
                    $('.argument-widget'), 0,
                    'Widget removed from DOM.'
                );
            }));

            it('should keep widget on deletion error',
            sinon.test(function() {
                var argument = withArgument();
                var server = sinon.fakeServer.create();
                argument.menu.click();
                argument.deleteButton.click();
                server.respondWith([401, {}, '{}']);
                server.respond();
                assert.lengthOf(
                    $('.argument-widget'), 1,
                    'Widget remains in DOM.'
                );
            }));
        });
    });
});
