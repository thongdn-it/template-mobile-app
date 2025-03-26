import { useNavigation } from '@react-navigation/native';

import { useHomeController } from './controller';
import { CoffeeItemView } from './views/coffee-item-view';
import { Divider, Text, FlatList, PageView } from '@components';

const ItemSeparatorComponent = () => <Divider className="my-2" />;

export const ListPage = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useHomeController();

  return (
    <PageView>
      <Text>Revopush v5 Check target version</Text>
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
    </PageView>
  );
};
