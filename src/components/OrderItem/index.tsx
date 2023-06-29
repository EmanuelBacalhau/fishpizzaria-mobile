import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Trash2 } from 'lucide-react-native'

import { OrderItemProps } from '../../pages/Order'

interface ItemProps {
  item: OrderItemProps
  deleteItem: (itemId: string) => Promise<void>
}

export function OrderItem({item, deleteItem}: ItemProps) {
  const handleDeleteItem = async () => {
    await deleteItem(item.id)
  } 

  return (
      <View style={styles.container}>
        <Text style={styles.name}>
          {item.amount} - {item.name}
        </Text>
        <TouchableOpacity onPress={handleDeleteItem}>
          <Trash2 color='red' size={20} />
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      borderRadius: 4,
      backgroundColor: '#ffffff34',
      paddingHorizontal: 8,
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    name: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    }
  }
)