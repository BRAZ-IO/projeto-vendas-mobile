import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Card } from 'react-native-paper';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  style 
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#E5E7EB',
          opacity,
        },
        style,
      ]}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Skeleton height={120} borderRadius={8} style={styles.imageSkeleton} />
        <View style={styles.textContainer}>
          <Skeleton height={16} width="80%" style={styles.titleSkeleton} />
          <Skeleton height={14} width="60%" style={styles.priceSkeleton} />
        </View>
      </Card.Content>
    </Card>
  );
};

export const CategorySkeleton: React.FC = () => {
  return (
    <View style={styles.categoryContainer}>
      <Skeleton height={60} width={60} borderRadius={30} />
      <Skeleton height={12} width={50} style={styles.categoryText} />
    </View>
  );
};

export const ListItemSkeleton: React.FC = () => {
  return (
    <Card style={styles.listCard}>
      <Card.Content style={styles.listContent}>
        <Skeleton height={80} width={80} borderRadius={8} />
        <View style={styles.listTextContainer}>
          <Skeleton height={16} width="70%" />
          <Skeleton height={14} width="50%" style={styles.listSubtext} />
          <Skeleton height={18} width="40%" style={styles.listPrice} />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    width: 160,
  },
  content: {
    padding: 12,
  },
  imageSkeleton: {
    marginBottom: 8,
  },
  textContainer: {
    gap: 6,
  },
  titleSkeleton: {
    marginBottom: 4,
  },
  priceSkeleton: {
    marginBottom: 4,
  },
  categoryContainer: {
    alignItems: 'center',
    marginHorizontal: 12,
    gap: 8,
  },
  categoryText: {
    marginTop: 4,
  },
  listCard: {
    margin: 8,
  },
  listContent: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  listTextContainer: {
    flex: 1,
    gap: 6,
  },
  listSubtext: {
    marginTop: 4,
  },
  listPrice: {
    marginTop: 8,
  },
});

export default Skeleton;
