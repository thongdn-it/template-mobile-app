import { useNavigation } from '@react-navigation/native';

import { useHomeController } from './controller';
import { CoffeeItemView } from './views/coffee-item-view';
import { Divider, Text, SafeAreaView, FlatList } from '@components';

const ItemSeparatorComponent = () => <Divider className="my-2" />;

export const ListPage = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useHomeController();

  return (
    <SafeAreaView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          className="px-4"
          data={data}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={({ item }) => (
            <CoffeeItemView
              coffee={item}
              onPress={coffee => navigation.navigate('Detail', { coffee })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};
