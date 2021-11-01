import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Default, Sider } from '../demos/Layout.stories';
import Layout from '../layout';
import useSiders from '../useSiders';

describe('Testing Layout', () => {
  it('render basic layout', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(container.getElementsByClassName('gio-layout')).toHaveLength(1);
  });

  it('layout with sider', () => {
    const { container } = render(<Sider {...Sider.args} />);
    expect(container.getElementsByClassName('gio-layout-sider')).toHaveLength(1);

    fireEvent.click(container.getElementsByClassName('gio-layout-sider-bottom-trigger')[0]);
    expect(screen.getByRole('img', { name: 'left-outlined', hidden: true })).toBeTruthy();
  });

  it('should be stable', () => {
    const { container } = render(
      <Layout>
        <Layout.Sider defaultCollapsed collapsedWidth={60} width={300} />
        <Layout>
          <Layout.Header>
            <Layout.Header.HeaderSection />
            <Layout.Header.HeaderDivider />
          </Layout.Header>
          <Layout.Content />
        </Layout>
      </Layout>
    );
    expect(container.getElementsByClassName('gio-layout')).toHaveLength(2);
  });

  test('Content maxWidth', () => {
    const { getByText } = render(
      <Layout>
        <Layout.Content maxWidth="auto">content</Layout.Content>
      </Layout>
    );

    expect(getByText('content').style.getPropertyValue('max-width')).toBe('100%');
  });

  test('Content margin', () => {
    const { getByText, rerender } = render(
      <Layout>
        <Layout.Content maxWidth="auto" style={{ margin: '0 10px' }}>
          content
        </Layout.Content>
      </Layout>
    );
    expect(getByText('content').style.getPropertyValue('margin')).toBe('');
    expect(getByText('content').parentElement.style.getPropertyValue('margin')).toBe('0px 10px');
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ width: 2000 }),
    });
    rerender(
      <Layout style={{ width: 2000 }}>
        <Layout.Content>content</Layout.Content>
      </Layout>
    );
    expect(getByText('content').style.getPropertyValue('margin')).toBe('');
  });

  test('sider trigger', () => {
    const { getByText, getByTestId, rerender } = render(
      <Layout>
        <Layout.Sider trigger={<div data-testid="trigger-test">trigger</div>} />
      </Layout>
    );
    expect(getByText('trigger').getAttribute('data-testid')).toBe('trigger-test');
    expect(getByTestId('sider-content').nextElementSibling).toBe(getByText('trigger'));

    rerender(
      <Layout>
        <Layout.Sider trigger="bottom" />
      </Layout>
    );

    expect(getByTestId('sider-content').nextElementSibling?.className.includes('gio-layout-sider-bottom-trigger')).toBe(
      true
    );
    expect(getByTestId('right-icon')).toBeTruthy();
    fireEvent(
      getByTestId('sider-content').nextElementSibling as Element,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(getByTestId('left-icon')).toBeTruthy();

    rerender(
      <Layout>
        <Layout.Sider trigger="top" />
      </Layout>
    );
    expect(getByTestId('sider-content').nextElementSibling).toBe(null);
  });

  test('useSiders', () => {
    const { result } = renderHook(() => useSiders());
    const _updateSiders = result.current[2];
    act(() => {
      _updateSiders({ id: '1', width: 200, collapsedWidth: 80, suspendedPosition: 'left' });
      _updateSiders({ id: '2', width: 300, collapsedWidth: 100, suspendedPosition: 'right' });
      _updateSiders({ id: '3', width: 100, collapsedWidth: 50 });
    });
    const [siders, removeSider, updateSiders, margin] = result.current;
    expect(siders.length).toBe(3);
    expect(margin).toStrictEqual([80, 100]);
    act(() => {
      removeSider('1');
    });
    expect(result.current[0].length).toBe(2);
    expect(result.current[3]).toStrictEqual([0, 100]);
    act(() => {
      updateSiders({ id: '3', width: 100, collapsedWidth: 50, suspendedPosition: 'left' });
    });
    expect(result.current[3]).toStrictEqual([50, 100]);
    act(() => {
      removeSider('2');
    });
    expect(result.current[3]).toStrictEqual([50, 0]);
  });
});
