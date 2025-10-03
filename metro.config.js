const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
// eslint-disable-next-line no-unused-vars
const defaultConfig = getDefaultConfig(__dirname)
const{
assetExts,
sourceExts

}= defaultConfig.resolver;
const config={  
    transformer:{
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver:{
        assetExts: assetExts.filter(ext=>ext !== 'svg'),
        sourceExts:[...sourceExts, 'svg'],
    }
}
// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {};

module.exports = mergeConfig(defaultConfig, config);
