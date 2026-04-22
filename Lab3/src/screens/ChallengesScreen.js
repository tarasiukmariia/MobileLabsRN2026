import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

export default function ChallengesScreen() {
  return (
    <Container>
      <Title>Завдання</Title>
    </Container>
  );
}
