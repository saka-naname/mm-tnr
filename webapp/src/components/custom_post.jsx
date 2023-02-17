import React from 'react';

import PropTypes from 'prop-types';

import {getChannel} from 'mattermost-redux/selectors/entities/channels';
import {useStore} from 'react-redux';

const {formatText, messageHtmlToComponent} = window.PostUtils;

// eslint-disable-next-line react/prop-types, no-unused-vars
const CustomPostComponent = ({post, theme}) => {
    const channelNamesMap = post && post.props && post.props.channel_mentions;
    const formattedText = messageHtmlToComponent(formatText(post.message, {
        channelNamesMap: channelNamesMap,
        atMentions: true,
    }));
    const store = useStore();

    if (getChannel(store.getState(), post.channel_id).display_name === 'times-new-roman') {
        return (
            <div style={{fontFamily: 'Times New Roman, Times, Linux Libertine, YuMincho, Hiragino Mincho ProN, Yu Mincho, MS PMincho, serif', fontWeight: 500}}>
                {formattedText}
            </div>
        );
    }
    return (
        <div>
            {formattedText}
        </div>
    );
};

CustomPostComponent.propTypes = {
    post: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default CustomPostComponent;
