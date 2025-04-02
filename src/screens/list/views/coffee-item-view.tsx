import { useI18n } from '@hooks';
import { CoffeeModel } from '@data';
import { HStack, Pressable, Text, VStack, Image } from '@components';

export const CoffeeItemView = ({
  coffee,
  onPress,
}: {
  coffee: CoffeeModel;
  onPress?: (coffee: CoffeeModel) => void;
}) => {
  const { t } = useI18n();

  return (
    <Pressable onPress={() => onPress?.(coffee)}>
      <HStack className="gap-2">
        <Image
          source={{ uri: coffee.image }}
          alt="coffee-image"
          className="w-[60px] h-[60px] rounded-lg"
        />
        <VStack className="justify-center">
          <Text className="font-bold">{coffee.title}</Text>
          <Text>{t('price', { price: coffee.price })}</Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};
