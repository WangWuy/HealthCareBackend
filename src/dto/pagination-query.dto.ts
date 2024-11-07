import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class PaginationQueryDto {
    @ApiProperty({
        description: 'Số trang muốn lấy',
        required: false,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiProperty({
        description: 'Số lượng item trên mỗi trang',
        required: false,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @ApiProperty({
        description: 'Trường dùng để sắp xếp',
        required: false,
    })
    @IsOptional()
    @IsString()
    sort_by?: string = 'created_at';

    @ApiProperty({
        description: 'Thứ tự sắp xếp',
        enum: SortOrder,
        required: false,
    })
    @IsOptional()
    @IsEnum(SortOrder)
    sort_order?: SortOrder = SortOrder.DESC;

    @ApiProperty({
        description: 'Từ khóa tìm kiếm',
        required: false,
    })
    @IsOptional()
    @IsString()
    search?: string;
}

// Helper class để tạo response pagination
export class PaginationResponseDto<T> {
    @ApiProperty({
        description: 'Dữ liệu trả về',
        isArray: true,
    })
    data: T[];

    @ApiProperty({
        description: 'Tổng số lượng bản ghi',
    })
    total: number;

    @ApiProperty({
        description: 'Trang hiện tại',
    })
    page: number;

    @ApiProperty({
        description: 'Số lượng bản ghi trên mỗi trang',
    })
    limit: number;

    @ApiProperty({
        description: 'Tổng số trang',
    })
    total_pages: number;

    constructor(data: T[], total: number, page: number, limit: number) {
        this.data = data;
        this.total = total;
        this.page = page;
        this.limit = limit;
        this.total_pages = Math.ceil(total / limit);
    }
}