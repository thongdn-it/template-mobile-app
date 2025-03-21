import { useI18n } from '@/src/hooks';
import { HStack, Image, Pressable, Text, VStack } from '@components';
import { CoffeeModel } from '@/src/data/models/coffee';

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
