import { environment } from '../../environments/environment';
import { CertificateType,CertificateLevel } from '../models/certificate.model';

export interface ICertificationColorPair {
  baseColor: string,
  radiaGradientColor: string,
}

type ICertificationColorDict = {
  readonly [level in CertificateLevel]: ICertificationColorPair
}

type ICertificationColors = {
  readonly [type in CertificateType]: ICertificationColorDict
}

export const certificationColors: ICertificationColors = {
  [CertificateType.ThoughtWorks]: {
    [CertificateLevel.AGILE_COACH]: {
      baseColor: '#F6A559', radiaGradientColor: '#F38C48'
    },
    [CertificateLevel.ADVANCED_AGILE_COACH]: {
      baseColor: '#F66F44', radiaGradientColor: '#EB5627'
    },
    [CertificateLevel.MASTER_AGILE_COACH]: {
      baseColor: '#F25248', radiaGradientColor: '#F76938'
    }
  },
  [CertificateType.Community]: {
    [CertificateLevel.AGILE_COACH]: {
      baseColor: '#9CC8AD', radiaGradientColor: '#9CC8AD'
    },
    [CertificateLevel.ADVANCED_AGILE_COACH]: {
      baseColor: '#40BDB1', radiaGradientColor: '#9CC8AD'
    },
    [CertificateLevel.MASTER_AGILE_COACH]: {
      baseColor: '#138671', radiaGradientColor: '#214E44'
    }
  },
  [CertificateType.Enterprise]: {
    [CertificateLevel.AGILE_COACH]: {
      baseColor: '#CEAFE2', radiaGradientColor: '#B397CC'
    },
    [CertificateLevel.ADVANCED_AGILE_COACH]: {
      baseColor: '#825AB9', radiaGradientColor: '#8E63CA'
    },
    [CertificateLevel.MASTER_AGILE_COACH]: {
      baseColor: '#4633A3', radiaGradientColor: '#5244A1'
    }
  },
  [CertificateType.University]: {
    [CertificateLevel.AGILE_COACH]: {
      baseColor: '#81C1F1', radiaGradientColor: '#8CD0FF'
    },
    [CertificateLevel.ADVANCED_AGILE_COACH]: {
      baseColor: '#318ACA', radiaGradientColor: '#6CC0FB'
    },
    [CertificateLevel.MASTER_AGILE_COACH]: {
      baseColor: '#005FA3', radiaGradientColor: '#0B609D'
    }
  }
}

export const Constants = {
  CERT_VIEWER_URL: environment.certViewUrl,
  REMOVE_BG_API_KEY: 'cX85oMeERZsfX8bCuRqA5B1a',
  BACKGROUND_COLOR: {
    'AGILE COACH': {
      red: 246,
      green: 165,
      blue: 89
    },
    'ADVANCED AGILE COACH': {
      red: 247,
      green: 105,
      blue: 56
    },
    'MASTER AGILE COACH': {
      red: 242,
      green: 82,
      blue: 72
    }
  }
};
