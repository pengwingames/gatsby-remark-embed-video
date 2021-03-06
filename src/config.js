"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const youtube_1 = require("./videoHelpers/youtube");
const get_video_id_1 = __importDefault(require("get-video-id"));
const twitch_1 = require("./videoHelpers/twitch");
exports.defaultOptions = {
    width: 560,
    ratio: 1.77,
    related: false,
    noIframeBorder: true
};
exports.videoServicesConfig = [
    {
        id: 'youtube',
        embedUrl: (videoId) => `https://www.youtube.com/embed/${videoId}`,
        urlProcessing: youtube_1.youtubeUrl
    },
    {
        id: 'vimeo',
        embedUrl: (videoId) => `https://player.vimeo.com/video/${videoId}`
    },
    {
        id: 'videopress',
        embedUrl: (videoId) => `https://videopress.com/embed/${videoId}`,
        additionalHTML: '<script src="https://videopress.com/videopress-iframe.js"></script>'
    },
    {
        id: 'twitch',
        embedUrl: (videoId) => `https://player.twitch.tv/?autoplay=false&video=${videoId}`
    },
    {
        id: 'twitchlive',
        embedUrl: (videoId) => `https://player.twitch.tv/?channel=${videoId}`
    }
];
exports.videoIdProcessors = [
    get_video_id_1.default,
    twitch_1.twitchIdProcessor
];
exports.knownPlatforms = () => {
    return exports.videoServicesConfig.map(val => val.id);
};
exports.getVideoService = (service) => {
    const foundService = exports.videoServicesConfig.find(val => val.id === service);
    if (foundService) {
        return foundService;
    }
    else {
        throw Error("VideoService could not be found");
    }
};
