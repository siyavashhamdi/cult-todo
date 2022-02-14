import { useEffect, useState } from "react";
import { Card, PageHeader, Row, Col } from "antd";
import { Collection, useUIComponents, use } from "@bluelibs/x-ui";
import { Constructor } from "@bluelibs/core";
import { Collections } from "@bundles/UIAppBundle";
import { useAppGuardian } from "@bundles/UIAppBundle/services/AppGuardian";
import { UserRole } from "@root/api.types";

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

      return <DashboardStats key={idx} collectionClass={collectionClass} />;
    });

  return (
    <UIComponents.AdminLayout>
      <PageHeader title="Dashboard" />

      {isAdminRole && (
        <Card>
          <Row gutter={[16, 24]}>{cards}</Row>
        </Card>
      )}
    </UIComponents.AdminLayout>
  );
}

export function DashboardStats(props: {
  collectionClass: Constructor<Collection>;
}) {
  const collection = use(props.collectionClass);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const collectionCount = await collection.count({});

        setCount(collectionCount);
      } catch {}
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
