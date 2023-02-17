import {getChannel} from 'mattermost-redux/selectors/entities/channels';

import CustomPost from './components/custom_post';
import manifest from './manifest';

// eslint-disable-next-line import/no-unresolved, no-unused-vars
// import {PluginRegistry} from './types/mattermost-webapp';

export default class Plugin {
    // eslint-disable-next-line no-unused-vars, no-empty-function
    async initialize(registry, store) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
        registry.registerMessageWillFormatHook(
            (post, message) => {
                const cc = getChannel(store.getState(), post.channel_id);
                if (cc.display_name === 'times-new-roman') {
                    console.table(post);
                }

                return message;
            },
        );

        registry.registerPostTypeComponent('', CustomPost);
    }
}

window.registerPlugin(manifest.id, new Plugin());
