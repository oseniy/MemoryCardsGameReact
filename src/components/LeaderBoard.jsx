import { useState, useEffect } from "react";
import { Table, TableElement, TableRow } from "../components/Table/Table";
import TextSmall from "../components/Texts/TextSmall/TextSmall";
import TextSmallPale from '../components/Texts/TextSmallPale/TextSMallPale';
import { getAllUsers, formatMilliseconds } from "../services/db";
import { useLoading } from "./Loading/LoadingContext";

export default function LeaderBoard({level}) {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useLoading();

    useEffect(() => {
        const getUsers = async () => {
            try {
                let users = await getAllUsers();
                users = sortingUsers(users, level);
                if (users.length > 0) setUsers(users);
            } catch(error) {
                console.error("ошибка при получении данных пользователей", error)
            }
        }

        getUsers();
    }, [])

    function sortingUsers(users, level) {
        return users
        .filter(user => user[level] && user.emailVerified)
        .sort((a, b) => a[level].score - b[level].score);

    }
    
    return (
        <>
            <Table>
                <TableRow>
                    <TableElement>
                        <TextSmall>Место</TextSmall>
                    </TableElement>
                    <TableElement>
                        <TextSmall>Игрок</TextSmall>
                    </TableElement>
                    <TableElement>
                        <TextSmall>Жизней осталось</TextSmall>
                    </TableElement>
                    <TableElement>
                        <TextSmall>Время на уровне (сек)</TextSmall>
                    </TableElement>
                </TableRow>
                {
                    users ? 
                        users.map((user, i) => {
                            if (!user[level]) return null;
                            console.log(user);
                            return (
                                <TableRow key={i}>
                                    <TableElement>
                                        <TextSmall className={(i == 0) ? "gold-color" : ""}>{i+1}</TextSmall>
                                    </TableElement>
                                    <TableElement>
                                        <TextSmall className={(i == 0) ? "gold-color" : ""}>{user.username}</TextSmall>
                                    </TableElement>
                                    <TableElement>
                                        <TextSmall className={(i == 0) ? "gold-color" : ""}>{user[level].HPsLeft}</TextSmall>
                                    </TableElement>
                                    <TableElement>
                                        <TextSmall className={(i == 0) ? "gold-color" : ""}>{formatMilliseconds(user[level].timeSpent)}</TextSmall>
                                    </TableElement>
                                </TableRow>
                            )
                        })  
                    : loading ?
                        <>{console.log("в loading")}</>
                    :
                        <TableRow>{console.log("в Пока тут ничего нет")}
                            <TableElement>
                                <TextSmallPale>Пока тут ничего нет...</TextSmallPale>
                            </TableElement>                    
                        </TableRow>                        
                }
            </Table>        
        </>
    )
}