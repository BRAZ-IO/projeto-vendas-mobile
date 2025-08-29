import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  Snackbar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../theme/theme';

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { login, register } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && (!name || !phone))) {
      setSnackbarMessage('Por favor, preencha todos os campos');
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    let success = false;

    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await register({ name, email, phone });
    }

    setLoading(false);

    if (!success) {
      setSnackbarMessage('Erro ao fazer login. Tente novamente.');
      setSnackbarVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#8B4B8C', '#D4A574']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require('../../assets/logo-gm-1.jpeg')}
              style={styles.logo}
            />
            <Title style={styles.title}>Tecidos & Decoração</Title>
            <Paragraph style={styles.subtitle}>
              Sua loja de tecidos e produtos para casa
            </Paragraph>
          </View>

          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </Title>

              {!isLogin && (
                <>
                  <TextInput
                    label="Nome completo"
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="account" />}
                  />
                  <TextInput
                    label="Telefone"
                    value={phone}
                    onChangeText={setPhone}
                    mode="outlined"
                    style={styles.input}
                    keyboardType="phone-pad"
                    left={<TextInput.Icon icon="phone" />}
                  />
                </>
              )}

              <TextInput
                label="E-mail"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
              />

              <TextInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                style={styles.input}
                secureTextEntry
                left={<TextInput.Icon icon="lock" />}
              />

              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
              >
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </Button>

              <Divider style={styles.divider} />

              <Button
                mode="text"
                onPress={() => setIsLogin(!isLogin)}
                style={styles.switchButton}
              >
                {isLogin
                  ? 'Não tem conta? Cadastre-se'
                  : 'Já tem conta? Faça login'}
              </Button>
            </Card.Content>
          </Card>
        </View>
        </ScrollView>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
        >
          {snackbarMessage}
        </Snackbar>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    marginTop: 8,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 16,
    elevation: 8,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: theme.colors.primary,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 24,
  },
  switchButton: {
    marginTop: 8,
  },
});

export default LoginScreen;
