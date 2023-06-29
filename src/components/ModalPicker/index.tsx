import { 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  StyleSheet,
  ScrollView
} from 'react-native'
import { CategoryProps } from '../../pages/Order'

interface ModalPickerProps {
  options: CategoryProps[]
  close: () => void
  itemSelected: (item: CategoryProps) => void
}

const { width: wd, height: ht } = Dimensions.get('window')

export function ModalPicker({ close, options, itemSelected }: ModalPickerProps) {

  function setCategorySelected(item: CategoryProps ) {
    itemSelected(item) 
    close()   
  }

  const categories = options.map((category, index) => (
    <TouchableOpacity 
      key={index} 
      style={styles.category} 
      onPress={() => setCategorySelected(category)}
    >
      <Text style={styles.textItem}>{category.name}</Text>
    </TouchableOpacity>
  ))

  return (
    <TouchableOpacity onPress={close} style={styles.container}>
      <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
             categories
            }
          </ScrollView>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: wd - 50,
    height: ht / 2,
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 16,
  },
  textItem: {
    color: 'white',
    fontSize: 16
  },
  category: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    marginBottom: 5,
    borderColor: '#ffffff5e',
    borderRadius: 4
  }
})