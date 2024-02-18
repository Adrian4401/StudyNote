import { MyColors } from "../colors";

export const dropdownStyles = {
    dropdown: {
        width: '100%',
        height: 50,
        borderColor: MyColors.appOrange,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: MyColors.appDark,
        marginBottom: 10
    },
    icon: {
        marginRight: 5
    },
    label: {
        position: 'absolute',
        backgroundColor: MyColors.appDark,
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14
    },
    placeholderStyle: {
        fontSize: 16,
        color: MyColors.appLightGray
    },
    selectedTextStyle: {
        fontSize: 16,
        color: MyColors.appLightGray
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    }
} 