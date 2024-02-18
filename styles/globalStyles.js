import { MyColors } from "../colors";

export const globalStyles = {
    headlineView: {
        width: '100%',
        marginTop: 10
    },
    headlineText: {
        fontSize: 20,
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
        marginVertical: 10
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
    }
}