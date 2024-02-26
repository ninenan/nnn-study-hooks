import { Alert, Button, Menu } from 'nnn-toy-ui';

export default function DemoUi() {
  return (
    <div>
      <Button btnType="primary" size="sm">
        test-button
      </Button>
      <Button btnType="danger" size="lg">
        danger-button
      </Button>
      <Alert title="alert-title" message="alert-message" type="warning"></Alert>
      <Menu
        defaultIndex="0"
        onSelect={(index: string) => console.log(index)}
        defaultOpenSubMenus={['2']}
        mode="horizontal"
      >
        <Menu.Item>test001</Menu.Item>
        <Menu.Item disabled>test002</Menu.Item>
        <Menu.SubMenu title="dropdown">
          <Menu.Item>dropdown01</Menu.Item>
          <Menu.Item>dropdown02</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>test004</Menu.Item>
        <Menu.SubMenu title="dropdown-04">
          <Menu.Item>dropdown0401</Menu.Item>
          <Menu.Item>dropdown0402</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}
