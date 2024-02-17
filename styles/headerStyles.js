import { MyColors } from "../colors"

export const headerStyles = {
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: '#000',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
      },
      headerText: {
        color: MyColors.appOrange,
        textAlign: 'center',
        fontSize: 30,
        textTransform: 'uppercase'
      }
}

