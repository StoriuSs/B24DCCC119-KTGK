import React from 'react';
import { Button, Grid, Input, Select } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { RoomFilters, RoomType, SeatSortOrder } from '@/services/QuanLyPhongHoc/typing';

const { useBreakpoint } = Grid;

interface RoomFiltersProps {
	filters: RoomFilters;
	roomTypeOptions: { value: RoomType; label: string }[];
	responsibleTeachers: string[];
	seatSortOrder: SeatSortOrder;
	onChange: (partial: Partial<RoomFilters>) => void;
	onReset: () => void;
	onToggleSort: () => void;
	onToggleAdvanced: () => void;
}

const RoomFiltersPanel: React.FC<RoomFiltersProps> = ({
	filters,
	roomTypeOptions,
	responsibleTeachers,
	seatSortOrder,
	onChange,
	onReset,
	onToggleSort,
	onToggleAdvanced,
}) => {
	const screens = useBreakpoint();
	const isMobile = !screens.md;

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, width: '100%' }}>
			<Input
				allowClear
				style={{ flex: '1 1 220px', minWidth: isMobile ? '100%' : 220 }}
				placeholder='Tìm theo mã phòng/tên phòng'
				value={filters.keyword}
				onChange={(event) => onChange({ keyword: event.target.value })}
			/>

			<Select<RoomType>
				allowClear
				style={{ flex: '1 1 180px', minWidth: isMobile ? '100%' : 180 }}
				placeholder='Lọc loại phòng'
				value={filters.loaiPhong}
				onChange={(value) => onChange({ loaiPhong: value })}
			>
				{roomTypeOptions.map((option) => (
					<Select.Option key={option.value} value={option.value}>
						{option.label}
					</Select.Option>
				))}
			</Select>

			<Select<string>
				allowClear
				style={{ flex: '1 1 220px', minWidth: isMobile ? '100%' : 220 }}
				placeholder='Lọc người phụ trách'
				value={filters.nguoiPhuTrach}
				onChange={(value) => onChange({ nguoiPhuTrach: value })}
			>
				{responsibleTeachers.map((name) => (
					<Select.Option key={name} value={name}>
						{name}
					</Select.Option>
				))}
			</Select>

			<Button
				style={{ width: isMobile ? '100%' : 'auto' }}
				icon={seatSortOrder === 'ascend' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
				onClick={onToggleSort}
			>
				Sắp xếp chỗ ngồi: {seatSortOrder === 'ascend' ? 'Tăng dần' : 'Giảm dần'}
			</Button>

			<Button style={{ width: isMobile ? '100%' : 'auto' }} onClick={onToggleAdvanced}>
				Advanced Filter
			</Button>
			<Button style={{ width: isMobile ? '100%' : 'auto' }} onClick={onReset}>
				Xóa lọc
			</Button>
		</div>
	);
};

export default RoomFiltersPanel;
