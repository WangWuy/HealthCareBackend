import { ApiProperty } from '@nestjs/swagger';
import { TimeHelper } from 'src/utils/helpers/time.helper';
import { BaseResponse } from 'src/utils/responses/base.response';
import { UserEntity } from 'src/entities/user.entity';

export class UserResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    google_id: string;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    status: number;

    @ApiProperty()
    created_at: string;

    @ApiProperty()
    updated_at: string;

    constructor(data?: UserEntity) {
        this.id = data?.id || 0;
        this.email = data?.email || '';
        this.google_id = data?.google_id || '';
        this.first_name = data?.first_name || '';
        this.last_name = data?.last_name || '';
        this.avatar = data?.avatar || '';
        this.status = data?.status || 0;
        this.created_at = TimeHelper.formatTimeDMY(data?.created_at) || '';
        this.updated_at = TimeHelper.formatTimeDMY(data?.updated_at) || '';
    }
}

export class UserResponseSwagger extends BaseResponse {
    @ApiProperty({
        type: UserResponseSwagger,
    })
    data?: UserResponseSwagger;
}
