import { MyColors } from "../colors";

export const globalStyles = {
    headlineView: {
        width: '100%',
        marginTop: 10
    },
    headlineViewWithIcon: {
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headlineText: {
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#fff',
        marginBottom: 10
    },
    littleText: {
        fontSize: 15,
        color: MyColors.appLightGray,
        textTransform: 'uppercase'
    },
    eventView: {
        width: '100%',
        backgroundColor: MyColors.appDark,
        borderRadius: 20,
        padding: 10,
        marginVertical: 5
    },
    eventSubjectView: {
        flexDirection: 'row',
        marginVertical: 15,
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    eventDatetimeView: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    subjectText: {
        fontSize: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
    bottomButtonsView: {
        width: '100%',
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}