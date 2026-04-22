import { Switch } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;

const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.text};
`;

export default function SettingsScreen({ toggleTheme, isDarkMode }) {
  return (
    <Container>
      <Title>Перемикач теми</Title>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </Container>
  );
}
