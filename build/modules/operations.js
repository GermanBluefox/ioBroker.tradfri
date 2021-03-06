"use strict";
/**
 * Provides operations for Tradfri devices using the CoAP layer
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_tradfri_client_1 = require("node-tradfri-client");
const virtual_group_1 = require("../lib/virtual-group");
const session_1 = require("./session");
/**
 * Sets some properties on virtual group or virtual properties on a real group.
 * Can be used to manually update non-existing endpoints on real groups.
 * @param group The group to be updated
 * @param operation The properties to be set
 * @returns true if a request was sent, false otherwise
 */
function operateVirtualGroup(group, operation) {
    return __awaiter(this, void 0, void 0, function* () {
        if (group.deviceIDs == undefined)
            return;
        // find all lightbulbs belonging to this group
        const lightbulbAccessories = group.deviceIDs
            .map(id => session_1.session.devices[id])
            .filter(dev => dev != null && dev.type === node_tradfri_client_1.AccessoryTypes.lightbulb);
        for (const acc of lightbulbAccessories) {
            yield session_1.session.tradfri.operateLight(acc, operation);
        }
        // and update the group
        if (group instanceof virtual_group_1.VirtualGroup) {
            group.merge(operation);
        }
    });
}
exports.operateVirtualGroup = operateVirtualGroup;
/**
 * Renames a device
 * @param accessory The device to be renamed
 * @param newName The new name to be given to the device
 * @returns true if a request was sent, false otherwise
 */
function renameDevice(accessory, newName) {
    // create a copy to modify
    const newAccessory = accessory.clone();
    newAccessory.name = newName;
    return session_1.session.tradfri.updateDevice(newAccessory);
}
exports.renameDevice = renameDevice;
/**
 * Renames a group
 * @param group The group to be renamed
 * @param newName The new name to be given to the group
 * @returns true if a request was sent, false otherwise
 */
function renameGroup(group, newName) {
    // create a copy to modify
    const newGroup = group.clone();
    newGroup.name = newName;
    return session_1.session.tradfri.updateGroup(newGroup);
}
exports.renameGroup = renameGroup;
