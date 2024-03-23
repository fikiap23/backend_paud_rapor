import { IsInt, IsString, IsArray, IsDateString, IsNotEmpty } from 'class-validator';

class CreateModulAjarDto {
    @IsNotEmpty()
    @IsInt()
    minggu: number;

    @IsNotEmpty()
    @IsString()
    topik: string;

    @IsNotEmpty()
    @IsString()
    subtopik: string;

    @IsNotEmpty()
    @IsString()
    capaianPembelajaran: string;

    @IsNotEmpty()
    @IsDateString()
    startDate: Date;

    @IsNotEmpty()
    @IsDateString()
    endDate: Date;

    @IsNotEmpty()
    @IsArray()
    katakunci: string[];

    @IsNotEmpty()
    @IsArray()
    tujuanPembelajaran: string[];

    @IsNotEmpty()
    @IsArray()
    tujuanKegiatan: string[];

    @IsNotEmpty()
    @IsArray()
    alatBahan: string[];

    @IsNotEmpty()
    @IsArray()
    petaKonsep: string[];

    @IsNotEmpty()
    @IsString()
    idMapel: string;

    @IsNotEmpty()
    @IsString()
    idRombel: string;
}

export default CreateModulAjarDto;
