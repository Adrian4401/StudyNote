import { MyColors } from "../utils/colors"

export const headerStyles = {
    headerBackground: {
        position: 'relative',
        top: 0,
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
      color: MyColors.appBlue,
      textAlign: 'center',
      fontSize: 30,
      textTransform: 'uppercase',
      fontWeight: 500
    }
}