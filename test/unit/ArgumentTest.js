
define(
[
    'chai',
    'fixtures',
    'argumenta/widgets/Argument',
    'argumenta/widgets/Proposition',
    'argumenta/widgets/Base'
],
function(chai, fixtures, Argument, Proposition, Base) {

    var assert = chai.assert;

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

            it('should show propositions when option is set', function() {
                var data = fixtures.validArgumentData();
                data.show_propositions = true;
                var argument = new Argument(data);
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
            });
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
    });
});
