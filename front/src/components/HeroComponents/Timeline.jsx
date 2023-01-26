import { Card, CardBody, CardHeader } from '@chakra-ui/card';
import { Box, Center, Flex, Text, useColorModeValue, chakra, Icon } from '@chakra-ui/react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
const backgrounds = [
    `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];
export default function Timeline() {
    return <Flex direction={'column'}>

        <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
            <chakra.h1
                py={5}
                fontSize={48}
                fontWeight={'bold'}
                color={useColorModeValue('gray.700', 'gray.50')}>
                Harmonogram prac
            </chakra.h1>

        </Box>
        <VerticalTimeline>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="30 marca 2022 - 12 kwietnia 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Planowanie</h3>
                <p>
                    Określenie ról w zespole, opis aplikacji i określenie stacku technologicznego oraz sposobu pracy.
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="12 kwietnia 2022 - 30 kwietnia 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Początki</h3>
                <p>
                    Utworzenie projektu w github. Budowa podstawowego API wraz z bazą danych. Rozpoczęcie prac nad podstawowymi komponentami frontendu. Utworzenie makiet i projektów głównych stron.
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="30 kwietnia 2022 - 27 maja 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Autoryzacja i autentykacja</h3>
                <p>
                    Utworzenie stron logowania i rejestrowania. Zaprojektowanie i implementacja autentykacji po stronie API. Połączenie logowania i rejestrowania. Dodanie działać CRUD na rachunki do API.
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="27 maja 2022 - 17 czerwca 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Rachunki</h3>
                <p>
                    Przygotowanie stron pod wyświetlanie danych o rachunkch z API. Utworzenie szkieletu Dashboardu. Walidacja i poprawki z zakresu UX/UI. Utworzenie zasobu w API z działaniami zbiorczymi na rachunkach.
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="1 październik 2022 - 11 październik 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Panel rachunków</h3>
                <p>
                    Stworzenie API pod filtrowanie rachunków. Stworzenie Opcji filtrowania rachunków po stronie klienta.
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="11 październik 2022 - 18 październik 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Użytkownicy</h3>
                <p>
                    Dodano profil użytkowika. Dodano możliwość zmiany hasła użytkownika.
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="11 październik 2022 - 18 październik 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Dashboard</h3>
                <p>
                    Rozbudowanie dashboardu o dane statystyczne.
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="18 październik 2022 - 30 październik 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Raporty</h3>
                <p>
                    Dodano generowanie raportów PDF
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="1 listopada 2022 - 16 listopada 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Pierwsza faza testów</h3>
                <p>
                    Rozpoczęto pierwsze testy funkcjonalne aplikacji
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="16 listopada 2022 - 30 listopada 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Poprawki po testach</h3>
                <p>
                    Naprawianie błędów wynikłych w testach
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="1 grudnia 2022 - 12 grudnia 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Druga faza testów</h3>
                <p>
                    Poprawki po testach
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="12 grudnia 2022 - 18 grudnia 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Poprawy</h3>
                <p>
                    Poprawki po drugiej fazie testów.
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="18 grudnia 2022 - 31 grudnia 2022"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">W sieć!</h3>
                <p>
                    Wystawienie aplikacji na serwer.
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: 'rgb(36, 42, 54)', color: '#48bb78' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(72, 187, 120)' }}
                date="1 stycznia 2023 - teraz"
                iconStyle={{ background: 'rgb(72, 187, 120)', color: '#fff' }}
            >
                <h3 className="vertical-timeline-element-title">Kończenie projektu</h3>
                <p>
                    Przygotowywanie dokumentacji końcowej, prezentacji oraz innym elementów potrzebnych na zakończenie projektu
                </p>
            </VerticalTimelineElement>

        </VerticalTimeline>
    </Flex>
}