import { useEffect, useState } from "react";
import { Card, PageHeader, Row, Col } from "antd";
import { Collection, useUIComponents, use } from "@bluelibs/x-ui";
import { Constructor } from "@bluelibs/core";
import { Collections } from "@bundles/UIAppBundle";
import { useAppGuardian } from "@bundles/UIAppBundle/services/AppGuardian";
import { UserRole } from "@root/api.types";
import { useQuery } from "@apollo/client";
import { TODOS_COUNT_QUERY } from "@bundles/UIAppBundle/mutations/todos.query";

type TodoCountQueryResult = {
  TodoEndUserCount: number;
};

export function Dashboard() {
  const UIComponents = useUIComponents();

  const guardian = useAppGuardian();
  const isAdminRole = guardian.hasRole(UserRole.ADMIN);

  const cards = Object.values(Collections)
    .filter((v) => Boolean(v))
    .map((collectionClass, idx: number) => {
      if (collectionClass === null) {
        return null;
      }

      return (
        <DashboardStats
          isAdminRole={isAdminRole}
          key={idx}
          collectionClass={collectionClass}
        />
      );
    });

  return (
    <UIComponents.AdminLayout>
      <PageHeader title="Dashboard" />

      <Card>
        <Row gutter={[16, 24]}>{cards}</Row>
      </Card>
    </UIComponents.AdminLayout>
  );
}

export function DashboardStats(props: {
  collectionClass: Constructor<Collection>;
  isAdminRole: boolean;
}) {
  const collection = use(props.collectionClass);
  const [count, setCount] = useState<number | null>(null);

  const countTodoQuery = useQuery<TodoCountQueryResult>(TODOS_COUNT_QUERY);

  useEffect(() => {
    (async () => {
      if (props.isAdminRole) {
        const collectionCount = await collection.count({});

        setCount(collectionCount);
      } else if (collection.getName() === "Todos") {
        const fetchedCountTodo = await countTodoQuery.fetchMore({});
        const { TodoEndUserCount } = fetchedCountTodo.data;

        setCount(TodoEndUserCount);
      }
    })();
  }, []);

  return (
    <>
      {count !== null && (
        <Col span={8}>
          <Card title={collection.getName()}>
            <h1>Total: {count}</h1>
          </Card>
        </Col>
      )}
    </>
  );
}
