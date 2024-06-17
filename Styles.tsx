import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: '#000',
  },
  text: {
    fontSize: 16,
    color: '#6f6f6f',
  },
  textDone: {
    fontSize: 16,
    color: '#6f6f6f',
    textDecorationLine: 'line-through',
  },
  whiteText: {
    fontSize: 20,
    color: '#fff',
  },
  textInput: {
    borderColor: '#6f6f6f',
    borderWidth: 1,
    width: Dimensions.get('screen').width * 0.6,
    borderRadius: 12,
    paddingLeft: 15,
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#5897fb',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.25,
    borderRadius: 12,
  },
  removeButton: {
    backgroundColor: '#f33d3d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  scrollContainer: {},
  itemContainer: {
    paddingVertical: 20,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
