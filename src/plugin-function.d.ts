import {Highway} from './highway';

export interface PluginHandles {
    highway: Highway
}

export interface PluginFunction {
    (pluginHandles: PluginHandles): Promise<void>;
}
