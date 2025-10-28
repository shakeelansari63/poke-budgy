import * as DocumentPicker from "expo-document-picker";
import * as Sharing from "expo-sharing";
import { Directory, File, Paths } from "expo-file-system";
import { appName, backupMimeType } from "../constants/app-constants";
import { DataStore } from "../storage/persistent-store";
import { Platform } from "react-native";
import { StoreState } from "../model/store";
import { ThemeColors } from "@/constants/colors";

export const exportData = async (): Promise<boolean> => {
    const currentTs = new Date()
        .toISOString()
        .substring(0, 19)
        .replaceAll(":", "-")
        .replaceAll("T", "-");
    const fileName = `${appName.replaceAll(" ", "-")}-${currentTs}.json`;

    // Generate file
    const dir = await Directory.pickDirectoryAsync(Paths.document.uri);
    console.log(dir);
    const file = new File(`${dir.uri}${fileName}`);
    file.write(getCurrentState());

    // Share / Save File
    // const saveStatus = await saveFile(file, fileName, backupMimeType);

    // // Delete file at end
    // await FileSystem.deleteAsync(fileWithPath);

    return true;
};

export const importData = async (): Promise<boolean> => {
    const document = await DocumentPicker.getDocumentAsync({
        type: backupMimeType,
        multiple: false,
        copyToCacheDirectory: true,
    });

    if (!document.canceled && document.assets.length > 0) {
        const asset = document.assets[0];
        if (asset.mimeType === backupMimeType) {
            // Read File
            console.log(asset.uri);
            const file = new File(asset.uri);
            const fileContent = await file.text();

            // Save Current State
            return setNewState(fileContent);
        } else return false;
    } else return false;
};

const getCurrentState = (): string => {
    const currentState: StoreState = {
        budget: {
            activeBudget: DataStore.getActiveBudget(),
            pastBudgets: DataStore.getInactiveBudgets(),
        },
        setting: DataStore.getSettings() ?? {
            currency: "USD",
            theme: "device",
            color: ThemeColors[0].base,
        },
    };

    return JSON.stringify(currentState);
};

const setNewState = (state: string): boolean => {
    try {
        const newState = JSON.parse(state) as StoreState;

        if (newState === null || newState === undefined) return false;

        // Check if data Exist and Set data accordingly
        if (
            newState.budget.activeBudget !== undefined &&
            newState.budget.pastBudgets !== null &&
            newState.budget.pastBudgets !== undefined &&
            newState.setting !== null &&
            newState.setting !== undefined
        ) {
            DataStore.setActiveBudget(newState.budget.activeBudget);
            DataStore.updateInactiveBudgets(newState.budget.pastBudgets);
            DataStore.setSettings(newState.setting);
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
};

// const saveFile = async (
//     file: File,
//     fileName: string,
//     mimeType: string,
// ): Promise<boolean> => {
//     if (Platform.OS === "android") {
//         const permission = await Directory.pickDirectoryAsync();
//         await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

//         // Permission Granted, save the file now
//         if (permission.granted) {
//             const fileContent = await FileSystem.readAsStringAsync(uri, {
//                 encoding: FileSystem.EncodingType.UTF8,
//             });

//             // Create empty file
//             const targetFile =
//                 await FileSystem.StorageAccessFramework.createFileAsync(
//                     permission.directoryUri,
//                     fileName,
//                     mimeType,
//                 );

//             // Write file content
//             await FileSystem.writeAsStringAsync(targetFile, fileContent, {
//                 encoding: FileSystem.EncodingType.UTF8,
//             });

//             return true;
//         } else {
//             return await shareFile(uri, mimeType);
//         }
//     } else {
//         return await shareFile(uri, mimeType);
//     }
// };

// const shareFile = async (uri: string, mimeType: string): Promise<boolean> => {
//     await Sharing.shareAsync(uri, {
//         dialogTitle: "Save/Share file",
//         UTI: mimeType,
//         mimeType: mimeType,
//     });
//     return true;
// };
