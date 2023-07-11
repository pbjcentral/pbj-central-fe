import { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { MantineReactTable } from 'mantine-react-table';

const API_ENDPOINT = 'https://api.example.com/users';

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(null);

  const fetchUsers = async () => {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = (type) => {
    switch (type) {
      case 'edit':
        setId(row.id);
        break;
      case 'delete':
        fetch(`${API_ENDPOINT}/${id}`, {
          method: 'DELETE',
        });
        setId(null);
        break;
      case 'create':
        // eslint-disable-next-line no-case-declarations
        const newUserObject = {
          name: '',
          email: '',
        };
        fetch(API_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(newUserObject),
        });
        break;
      case 'resendActivationEmail':
        fetch(`${API_ENDPOINT}/${id}/resendActivationEmail`, {
          method: 'POST',
        });
        break;
    }
  };

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Text>Application navbar</Text>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      <MantineReactTable
        data={users}
        columns={[
          {
            "title": "Name",
            accessor: "name",
          },
          {
            title: "Email",
            accessor: "email",
          },
          {
            title: "Action",
            cell: ({ row }) => (
              <button
                onClick={() => handleAction(row.id)}
              >
                {row.id ? "Edit" : "Create"}
              </button>
            ),
          },
          {
            title: "Resend Activation Email",
            cell: ({ row }) => (
              <button
                onClick={() => handleAction("resendActivationEmail")}
              >
                Resend
              </button>
            ),
          },
        ]}
        onAction={handleAction}
      />
    </AppShell>
  );
}