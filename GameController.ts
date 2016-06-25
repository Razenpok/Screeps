﻿import SmartCreepFactory from "./SmartCreepFactory";
import Settings from "./Settings";
import SmartCreepType from "./SmartCreepType";

export default class GameController {

    static initialize() {
    }

    static loop() {
        for (let name in Memory.creeps) {
            if (Memory.creeps.hasOwnProperty(name)) {
                if (!Game.creeps[name]) {
                    delete Memory.creeps[name];
                    console.log(`Clearing non-existing creep memory: ${name}`);
                }
            }
        }

        const spawn = Game.spawns[Settings.mainSpawner];

        const harvesters = _.filter(Game.creeps, (creep) => creep.memory.type === SmartCreepType.Harvester);
        if (harvesters.length < 2 && !spawn.spawning) {
            const newName = spawn.createCreep([WORK, CARRY, MOVE], undefined, { type: SmartCreepType.Harvester });
            console.log(`Spawning new harvester: ${newName}`);
        }

        const upgraders = _.filter(Game.creeps, (creep) => creep.memory.type === SmartCreepType.Upgrader);
        if (upgraders.length < 2 && !spawn.spawning) {
            const newName = spawn.createCreep([WORK, CARRY, MOVE], undefined, { type: SmartCreepType.Upgrader });
            console.log(`Spawning new upgrader: ${newName}`);
        }

        const builders = _.filter(Game.creeps, (creep) => creep.memory.type === SmartCreepType.Builder);
        if (builders.length < 2 && !spawn.spawning) {
            const newName = spawn.createCreep([WORK, CARRY, MOVE], undefined, { type: SmartCreepType.Builder });
            console.log(`Spawning new builder: ${newName}`);
        }

        for (let name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                const gameCreep = Game.creeps[name];
                const creep = SmartCreepFactory.create(gameCreep);
                creep.processTick();
            }
        }
    }
}