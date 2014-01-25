
define(
[
    'chai',
    'sinon',
    'fixtures',
    'helpers',
    'argumenta/config',
    'argumenta/widgets/Tags',
    'argumenta/widgets/Base',
],
function(chai, undefined, fixtures, helpers, Config, Tags, Base) {

    var assert = chai.assert;
    var baseUrl = Config.baseUrl;

    // Tests

    describe('Tags', function() {

        it('should be a function', function() {
            assert.isFunction(Tags);
        });

        it('should include a moduleID', function() {
            assert.equal(Tags.prototype.moduleID, 'Tags');
        });

        describe('new Tags( options, element )', function() {

            it('should return a new Tags widget', sinon.test(function() {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var tags = new Tags(data);
                assert.instanceOf(
                    tags, Base,
                    'Tags widgets inherit from Base.'
                );
                assert.instanceOf(
                    tags, Tags,
                    'Tags widgets are instances of Tags.'
                );
            }));

            it('should accept tags and sources options', sinon.test(function() {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var opts = fixtures.tagsPlusSourcesData();
                data.tags = opts.tags;
                data.sources = opts.sources;
                var tags = new Tags(data);
                assert.equal(
                    tags.getTags(), opts.tags,
                    'Check tags option.'
                );
                assert.equal(
                    tags.getSources(), opts.sources,
                    'Check sources option.'
                );
            }));

            it('should show tags passed as options', sinon.test(function () {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var opts = fixtures.tagsPlusSourcesData();
                data.tags = opts.tags;
                data.sources = opts.sources;
                var tags = new Tags(data);
                data.sources.forEach(function(source, i, sources) {
                    var type = source.object_type;
                    var $widgets = tags.element.find('.' + type + '-widget');
                    var expected = data.sources.filter(function(src) {
                        return src.object_type === type;
                    });
                    assert.ok(
                        $widgets.length === expected.length,
                        'Check source widgets.'
                    );
                });
            }));
        });

        describe('getTargetType()', function() {

            it('should get the target type',
            sinon.test(function() {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var tags = new Tags(data);
                assert.equal(
                    tags.getTargetType(),
                    data.target_type,
                    'Check target type.'
                );
            }));
        });

        describe('getTargetSha1()', function() {

            it('should get the target SHA-1',
            sinon.test(function() {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var tags = new Tags(data);
                assert.equal(
                    tags.getTargetSha1(),
                    data.target_sha1,
                    'Check target SHA-1.'
                );
            }));
        });

        describe('getTags()', function() {

            it('should get tags data',
            sinon.test(function() {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var tags = new Tags(data);
                var sha1 = data.target_sha1;
                var responseData = fixtures.tagsPlusSourcesData();
                server.respondWith(
                    'GET',
                    baseUrl + '/propositions/' + sha1 + '/tags-plus-sources.json',
                    [
                        200,
                        fixtures.headers('JSON'),
                        JSON.stringify(responseData)
                    ]
                );
                server.respond();
                assert.deepEqual(
                    tags.getTags(),
                    JSON.parse(JSON.stringify(responseData.tags)),
                    'Check tags data.'
                );
            }));
        });

        describe('getSources()', function() {

            it('should get sources data',
            sinon.test(function() {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var tags = new Tags(data);
                var sha1 = data.target_sha1;
                var responseData = fixtures.tagsPlusSourcesData();
                server.respondWith(
                    'GET',
                    baseUrl + '/propositions/' + sha1 + '/tags-plus-sources.json',
                    [
                        200,
                        fixtures.headers('JSON'),
                        JSON.stringify(responseData)
                    ]
                );
                server.respond();
                var sources = tags.getSources();
                for (var i in sources) {
                    var source = sources[i];
                    helpers.assertSuperset(
                        source,
                        JSON.parse(JSON.stringify(responseData.sources[i])),
                        'Check tags data.'
                    );
                }
            }));
        });

        describe('getCommits()', function() {

            it('should get commits data',
            sinon.test(function() {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var tags = new Tags(data);
                var sha1 = data.target_sha1;
                var responseData = fixtures.tagsPlusSourcesData();
                server.respondWith(
                    'GET',
                    baseUrl + '/propositions/' + sha1 + '/tags-plus-sources.json',
                    [
                        200,
                        fixtures.headers('JSON'),
                        JSON.stringify(responseData)
                    ]
                );
                server.respond();
                assert.deepEqual(
                    tags.getCommits(),
                    JSON.parse(JSON.stringify(responseData.commits)),
                    'Check tags data.'
                );
            }));
        });

        describe('setTarget( type, sha1 )', function() {

            it('should set the target type and sha1',
            sinon.test(function() {
                var server = sinon.fakeServer.create();
                var prop = fixtures.validPropositionData();
                var tags = new Tags();
                tags.setTarget(prop.object_type, prop.sha1);
                assert.equal(
                    tags.getTargetType(), prop.object_type,
                    'Check target type.'
                );
                assert.equal(
                    tags.getTargetSha1(), prop.sha1,
                    'Check target sha1.'
                );
            }));
        });

        describe('setTags( tagsData )', function() {

            it('should set the tags for given data',
            sinon.test(function() {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var tags = new Tags(data);
                var response = fixtures.tagsPlusSourcesData();
                tags.setTags(response.tags);
                assert.deepEqual(
                    tags.getTags(),
                    response.tags,
                    'Check tags data.'
                );
            }));
        });

        describe('setSources( sourcesData )', function() {

            it('should set the sources for given data',
            sinon.test(function() {
                var server = sinon.fakeServer.create();
                var data = fixtures.validTagsData();
                var tags = new Tags(data);
                var response = fixtures.tagsPlusSourcesData();
                tags.setSources(response.sources);
                var result = tags.getSources();
                var expected = response.sources;
                assert.deepEqual(
                    result, expected,
                    'Check sources data.'
                );
            }));
        });
    });
});
