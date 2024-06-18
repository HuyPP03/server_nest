import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BuildHtmlService {
  constructor(private configService: ConfigService) {}

  async buildHtmlRegisterUser(token: string) {
    const baseUrl = this.configService.get<string>('app.baseUrl');
    const generateUrl = `${baseUrl}/verify?token=${token}`;
    return `
        <div style="width: 600px; height: 300px; display: flex; justify-content: center; align-items: center; background-color: #f0f0f0; margin: 0 auto;">
            <a href="${generateUrl}" style="text-decoration: none;">
                <button style="background-color: blue; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                    Verify
                </button>
            </a>
        </div>
    `;
  }
}
