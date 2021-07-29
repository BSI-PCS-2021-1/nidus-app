import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// import { API_KEY, API_SECRET_KEY } from 'react-native-dotenv';

import { Header } from '../../components/Header'
import { Menu } from '../../components/Menu';
import { ListNote } from '../ListNote';
import { ListReminder } from '../ListReminder';
import { AddNote } from '../AddNote';
import { AddReminder } from '../AddReminder';

import * as S from './styles';

interface DashboardProps {
  navigation: any;
  route: any;
}

interface Credentials {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  scope: string;
  tokenType: string;
}

interface Note {
  text: string;
}

interface Reminder {
  text: string;
  date: Date;
}

interface UserData {
  name: string;
}

export const Dashboard = ({ navigation, route }: DashboardProps) => {
  const [page, setPage] = useState('ListNote');
  const [notes, setNotes] = useState<Note[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const { credentials }: { credentials: Credentials } = route.params;

  const handleAddNotes = (newNotes: [Note]) => {
    setNotes(newNotes);
    setPage('ListNote');
  }

  const handleAddReminders = (newReminders: [Reminder]) => {
    setReminders(newReminders);
    setPage('ListReminder');
  }

  const handleLogout = async () => {
    navigation.navigate("Auth");
  }

  // useEffect(() => {
  //   console.log(credentials)
  // }, []);


  const test = async () => {
    // const response = await fetch('http://0.0.0.0:8080/teste');

    // fetch('http://0.0.0.0:8080/login', {
    //   method: 'POST',
    //   body: JSON.stringify(credentials)
    // })

    // console.log(await response.json());
  }

  const renderContent = (page: string) => {
    switch (page) {
      case 'ListNote':
        return <ListNote notes={notes} />
        break;
      case 'AddNote':
        return <AddNote setNotes={(t: [Note]) => handleAddNotes(t)} notes={notes} />
        break;
      case 'AddReminder':
        return <AddReminder setReminders={(r: [Reminder]) => handleAddReminders(r)} reminders={reminders} />
        break;
      case 'ListReminder':
        return <ListReminder reminders={reminders} />
        break;
    }
  }

  return (
    <S.Container>
      <Header logout={handleLogout}></Header>
      <S.Main>
        {renderContent(page)}
      </S.Main>
      <Menu setPage={(e: string) => setPage(e)} page={page} test={test}></Menu>
    </S.Container>
  )
    ;
}
