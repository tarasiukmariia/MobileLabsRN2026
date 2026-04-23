import { useContext } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { GameContext } from "../context/GameContext";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  padding: 20px;
`;

const Card = styled.View`
  background-color: ${(props) => props.theme.surface};
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${(props) => props.theme.border};
`;

const TextContainer = styled.View`
  flex: 1;
  margin-left: 15px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const Subtitle = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.textSecondary};
  margin-top: 4px;
`;

const ProgressText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) =>
    props.isDone ? props.theme.success : props.theme.textSecondary};
`;

export default function ChallengesScreen() {
  const { score, stats } = useContext(GameContext);
  const challenges = [
    {
      id: "1",
      title: "Зробити 10 кліків",
      target: 10,
      current: stats.taps,
      icon: "hand-left",
    },
    {
      id: "2",
      title: "Подвійний клік 5 разів",
      target: 5,
      current: stats.doubleTaps,
      icon: "hand-left-outline",
    },
    {
      id: "3",
      title: "Утримувати об'єкт 3 сек",
      target: 1,
      current: stats.longPresses,
      icon: "time",
    },
    {
      id: "4",
      title: "Перетягнути об'єкт",
      target: 1,
      current: stats.drags,
      icon: "move",
    },
    {
      id: "5",
      title: "Свайп вправо",
      target: 1,
      current: stats.swipeRight,
      icon: "arrow-forward",
    },
    {
      id: "6",
      title: "Свайп вліво",
      target: 1,
      current: stats.swipeLeft,
      icon: "arrow-back",
    },
    {
      id: "7",
      title: "Змінити розмір (Pinch)",
      target: 1,
      current: stats.pinches,
      icon: "resize",
    },
    {
      id: "8",
      title: "Отримати 100 очок",
      target: 100,
      current: score,
      icon: "star",
    },
    {
      id: "9",
      title: "Власне: Набрати 500 очок",
      target: 500,
      current: score,
      icon: "trophy",
    },
  ];

  const renderItem = ({ item }) => {
    const isDone = item.current >= item.target;
    return (
      <Card>
        <Ionicons
          name={item.icon}
          size={28}
          color={isDone ? "#4CD964" : "#00A8FF"}
        />
        <TextContainer>
          <Title>{item.title}</Title>
          <Subtitle>
            Виконано: {Math.min(item.current, item.target)} / {item.target}
          </Subtitle>
        </TextContainer>
        {isDone ? (
          <Ionicons name="checkmark-circle" size={28} color="#4CD964" />
        ) : (
          <ProgressText isDone={isDone}>
            {Math.round(
              (Math.min(item.current, item.target) / item.target) * 100,
            )}
            %
          </ProgressText>
        )}
      </Card>
    );
  };

  return (
    <Container>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
