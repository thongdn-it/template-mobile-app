import { StaticScreenProps } from '@react-navigation/native';

import { CoffeeModel } from '@data';
import { Text, SafeAreaView, VStack, Image } from '@components';

type Props = StaticScreenProps<{
  coffee: CoffeeModel;
}>;
export const DetailPage = ({ route }: Props) => {
  return (
    <SafeAreaView>
      <VStack className="items-center m-4 gap-2">
        <Image
          source={{ uri: route.params.coffee.image }}
          alt="coffee-image"
          className="w-[200px] h-[200px] rounded-lg"
        />
        <Text className="font-bold text-xl">{route.params.coffee.title}</Text>
        <Text className="text-center text-secondary-800">
          {route.params.coffee.description}
        </Text>
      </VStack>
    </SafeAreaView>
  );
};
